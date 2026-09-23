const functionTypes = new Set([
  'ArrowFunctionExpression',
  'FunctionDeclaration',
  'FunctionExpression',
]);

const remoteClientName = /(?:Api|API|Client|Service)$/;

const isFunction = node => functionTypes.has(node.type);
const isNode = node => Boolean(node && typeof node.type === 'string');
const toArray = value => (Array.isArray(value) ? value : [value]);
const getChildren = (node, visitorKeys) =>
  (visitorKeys[node.type] ?? []).flatMap(key => toArray(node[key])).filter(isNode);

const walk = (node, visitorKeys, visit) => {
  if (!isNode(node)) {
    return;
  }

  if (visit(node) === false) {
    return;
  }

  getChildren(node, visitorKeys).forEach(child => walk(child, visitorKeys, visit));
};

const isFalseLiteral = node => node?.type === 'Literal' && node.value === false;
const isIdentifier = node => node?.type === 'Identifier';
const isIdentifierNamed = (node, name) => isIdentifier(node) && node.name === name;

const isReactUseState = node =>
  node.type === 'MemberExpression' &&
  !node.computed &&
  isIdentifierNamed(node.object, 'React') &&
  isIdentifierNamed(node.property, 'useState');

const isUseStateCall = node => {
  if (node?.type !== 'CallExpression' || !isFalseLiteral(node.arguments[0])) {
    return false;
  }

  return isIdentifierNamed(node.callee, 'useState') || isReactUseState(node.callee);
};

const getRootIdentifier = node => {
  switch (node?.type) {
    case 'Identifier':
      return node;
    case 'ChainExpression':
      return getRootIdentifier(node.expression);
    case 'MemberExpression':
      return getRootIdentifier(node.object);
    default:
      return undefined;
  }
};

const isRemoteCall = node => {
  if (node.type !== 'CallExpression') {
    return false;
  }

  const root = getRootIdentifier(node.callee);

  if (!root) {
    return false;
  }

  return root.name === 'fetch' || root.name === 'axios' || remoteClientName.test(root.name);
};

const containsRemoteCall = (node, visitorKeys) => {
  let found = false;

  walk(node, visitorKeys, child => {
    if (child !== node && isFunction(child)) {
      return false;
    }

    if (!isRemoteCall(child)) {
      return undefined;
    }

    found = true;

    return false;
  });

  return found;
};

const isSetterCall = (node, setterName, value) => {
  if (node.type !== 'CallExpression' || !isIdentifierNamed(node.callee, setterName)) {
    return false;
  }

  const [argument] = node.arguments;

  return argument?.type === 'Literal' && argument.value === value;
};

const isSWRFetcher = node =>
  node.parent?.type === 'CallExpression' &&
  node.parent.arguments[1] === node &&
  isIdentifierNamed(node.parent.callee, 'useSWRMutation');

const collectFunctions = (owner, visitorKeys) => {
  const functions = [owner];

  walk(owner.body, visitorKeys, node => {
    if (isFunction(node)) {
      functions.push(node);
    }
  });

  return functions;
};

const isRemoteAwait = (node, visitorKeys) =>
  node.type === 'AwaitExpression' && containsRemoteCall(node.argument, visitorKeys);

const hasManualRemoteState = (node, setterName, visitorKeys) => {
  if (isSWRFetcher(node)) {
    return false;
  }

  let startsLoading = false;
  let stopsLoading = false;
  let awaitsRemoteCall = false;

  walk(node.body, visitorKeys, child => {
    if (isFunction(child)) {
      return false;
    }

    startsLoading ||= isSetterCall(child, setterName, true);
    stopsLoading ||= isSetterCall(child, setterName, false);

    awaitsRemoteCall ||= isRemoteAwait(child, visitorKeys);

    return undefined;
  });

  return startsLoading && stopsLoading && awaitsRemoteCall;
};

const getStatePair = node => {
  if (node.id.type !== 'ArrayPattern') {
    return undefined;
  }

  const [state, setter] = node.id.elements;

  if (!isIdentifier(state)) {
    return undefined;
  }

  if (!isIdentifier(setter)) {
    return undefined;
  }

  return {state, setter};
};

const getCandidate = (node, owner) => {
  const pair = getStatePair(node);

  if (!pair || !isUseStateCall(node.init)) {
    return undefined;
  }

  return {node, owner, setterName: pair.setter.name};
};

export const preferSWRMutationRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require SWR mutation state for user-triggered remote operations',
    },
    schema: [],
    messages: {
      preferSWRMutation:
        'Use useSWRMutation and its isMutating state instead of hand-rolling remote loading state with useState.',
    },
  },

  create(context) {
    const candidates = [];
    const functionStack = [];
    const {visitorKeys} = context.sourceCode;

    const enterFunction = node => functionStack.push(node);
    const exitFunction = () => functionStack.pop();

    return {
      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      VariableDeclarator(node) {
        const owner = functionStack.at(-1);

        if (!owner) {
          return;
        }

        const candidate = getCandidate(node, owner);

        if (candidate) {
          candidates.push(candidate);
        }
      },
      'Program:exit'() {
        for (const candidate of candidates) {
          const functions = collectFunctions(candidate.owner, visitorKeys);
          const violatesRule = functions.some(node =>
            hasManualRemoteState(node, candidate.setterName, visitorKeys)
          );

          if (violatesRule) {
            context.report({node: candidate.node, messageId: 'preferSWRMutation'});
          }
        }
      },
    };
  },
};

export const swrMutationPlugin = {
  rules: {
    'prefer-swr-mutation': preferSWRMutationRule,
  },
};

export default {
  'shelf/prefer-swr-mutation': 'error',
};

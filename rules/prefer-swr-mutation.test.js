import assert from 'node:assert/strict';
import test from 'node:test';
import tsParser from '@typescript-eslint/parser';
import {RuleTester} from 'eslint';
import frontendConfig from '../frontend-typescript.js';
import noPrettierConfig from '../frontend-typescript-no-prettier.js';
import {preferSWRMutationRule} from './prefer-swr-mutation.js';

const enablesRule = (config) =>
  config.some(
    (entry) => entry.plugins?.shelf && entry.rules?.['shelf/prefer-swr-mutation'] === 'error',
  );

test('frontend configs enforce the rule', () => {
  assert.equal(enablesRule(frontendConfig), true);
  assert.equal(enablesRule(noPrettierConfig), true);
});

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    parser: tsParser,
    parserOptions: {ecmaFeatures: {jsx: true}},
    sourceType: 'module',
  },
});

ruleTester.run('prefer-swr-mutation', preferSWRMutationRule, {
  valid: [
    `
      function DownloadButton() {
        const {trigger, isMutating} = useSWRMutation(
          {api: 'ContentApi.download'},
          () => ContentApi.download()
        );

        return {trigger, isMutating};
      }
    `,
    `
      function Menu() {
        const [isOpen, setIsOpen] = useState(false);
        return {isOpen, setIsOpen};
      }
    `,
    `
      function AnimatedButton() {
        const [isLoading, setIsLoading] = useState(false);

        const animate = async () => {
          setIsLoading(true);
          await waitForAnimation();
          setIsLoading(false);
        };

        return animate;
      }
    `,
    `
      function AdvancedMutation() {
        const [isProcessing, setIsProcessing] = useState(false);

        return useSWRMutation('key', async () => {
          setIsProcessing(true);
          await ContentApi.update();
          setIsProcessing(false);
        });
      }
    `,
    `
      async function downloadWithoutLoadingState() {
        return await ContentApi.download();
      }
    `,
  ],
  invalid: [
    {
      code: `
        function DownloadButton() {
          const [isDownloading, setIsDownloading] = useState(false);

          const download = async () => {
            setIsDownloading(true);
            try {
              await ContentApi.download();
            } finally {
              setIsDownloading(false);
            }
          };

          return {download, isDownloading};
        }
      `,
      errors: [{messageId: 'preferSWRMutation'}],
    },
    {
      code: `
        function SaveButton() {
          const [isSaving, setIsSaving] = React.useState(false);

          async function save() {
            setIsSaving(true);
            await fetch('/save');
            setIsSaving(false);
          }

          return save;
        }
      `,
      errors: [{messageId: 'preferSWRMutation'}],
    },
    {
      code: `
        const UploadButton = () => {
          const [uploading, setUploading] = useState(false);

          const upload = async () => {
            setUploading(true);
            await apiClient.files.upload();
            setUploading(false);
          };

          return upload;
        };
      `,
      errors: [{messageId: 'preferSWRMutation'}],
    },
    {
      code: `
        function CacheTestButton() {
          const [isTestingCache, setIsTestingCache] = useState(false);

          const testCache = async () => {
            setIsTestingCache(true);
            try {
              await AssistantsApi.testCache();
            } finally {
              setIsTestingCache(false);
            }
          };

          return testCache;
        }
      `,
      errors: [{messageId: 'preferSWRMutation'}],
    },
  ],
});

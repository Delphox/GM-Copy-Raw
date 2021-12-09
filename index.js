import { contextMenu } from '@goosemod/patcher';
import { findByProps } from '@goosemod/webpack';

const { copy } = findByProps('SUPPORTS_COPY', 'copy');

let unpatch;

export default {
  goosemodHandlers: {
    onImport: () => {
      unpatch = contextMenu.patch('message', {
        label: 'Copy Raw',

        action: (_originalArgs, extraInfo) => {
          try {
            if (extraInfo.message.content == "") {
              return goosemodScope.showToast("Unable to copy", {
                type: 'error',
              });
            }

            copy(extraInfo.message.content);
            goosemodScope.showToast("Copied!", {
              type: 'success',
              icon: false,
            });
          } catch (error) {
            goosemodScope.showToast("An error has occured!", { type: 'error' });
            goosemodScope.logger.debug("Copy Raw - ERROR", error);
          }
        },
      });
    },

    onRemove: () => {
      unpatch();
    },
  },
};

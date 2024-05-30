import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { get } from "enmity/api/settings";

import manifest from '../manifest.json';
import Settings from "./components/Settings"

const ChatInput = getByProps('ChatInput');
const Patcher = create('HideChatButtons');

const HideChatButtons: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(ChatInput.ChatInput.prototype, 'render', (ctx, [props], res) => {
         const chatInput: any = findInReactTree(
            res, r => 
            typeof r.props?.isAppLauncherEnabled === 'boolean' || 
            typeof r.props?.hideGiftButton === 'boolean' ||
            typeof r.props?.canSendVoiceMessage === 'boolean'
         );

         if (!chatInput) return;
         chatInput.props.isAppLauncherEnabled = false;
         chatInput.props.hideGiftButton = true;
         chatInput.props.canSendVoiceMessage = false

         if (!get(manifest.name, "allowVoice", true)) return;
         chatInput.props.canSendVoiceMessage = true
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(HideChatButtons);

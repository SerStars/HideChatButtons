import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { get } from "enmity/api/settings";

import manifest, { name as plugin_name } from '../manifest.json'
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
            typeof r.props?.canSendVoiceMessage === 'boolean' ||
            typeof r.props?.canStartThreads === 'boolean'
         );

         if (!chatInput) return;
         if (get(plugin_name, "hideVoice", true)) {
            chatInput.props.canSendVoiceMessage = false
         }
         else {
            chatInput.props.canSendVoiceMessage = true
         }

         if (get(plugin_name, "hideLauncher", true)) {
            chatInput.props.isAppLauncherEnabled = false;
         }
         else {
            chatInput.props.isAppLauncherEnabled = true;
         }

         if (get(plugin_name, "hideGift", true)) {
            chatInput.props.hideGiftButton = true;
         }
         else {
            chatInput.props.hideGiftButton = false;
         }

         if (get(plugin_name, "hideThread", true)) {
            chatInput.props.canStartThreads = false;
         }
         else {
            chatInput.props.canStartThreads = true;
         }
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

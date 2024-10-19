// Created by mafu, modified by SerStars
import {FormRow, FormSection, FormSwitch, ScrollView, Text} from 'enmity/components'
import {Constants, React, StyleSheet, Dialog} from 'enmity/metro/common'
import {Linking} from "enmity/metro/common"
// @ts-ignore
import {version} from '../../manifest.json'
import {getIDByName} from "enmity/api/assets"

const GitHubIcon = getIDByName('img_account_sync_github_white')
const MuteIcon = getIDByName('ic_mic_muted_dark_24px')
const AppIcon = getIDByName('ic_application_command_24px')
const GiftIcon = getIDByName('ic_gift_24px')
const ThreadIcon = getIDByName('ThreadPlusIcon')

export default ({settings}) => {
   const styles = StyleSheet.createThemedStyleSheet({
      footer: {
         color: Constants.ThemeColorMap.HEADER_SECONDARY,
         textAlign: 'center',
         paddingTop: 10,
         paddingBottom: 20
      }
   })
   return (
   <ScrollView>
      <FormSection title="HIDE BUTTONS">
         <FormRow
         label="Disable Voice Message"
         subLabel="Hide the Record Voice Message button"
         leading={<FormRow.Icon source={MuteIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideVoice", true)}
         onValueChange={(value) => {
            settings.set("hideVoice", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable App Launcher"
         subLabel="Hide the App Launcher button"
         leading={<FormRow.Icon source={AppIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideLauncher", true)}
         onValueChange={(value) => {
            settings.set("hideLauncher", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Gift"
         subLabel="Hide the Gift button"
         leading={<FormRow.Icon source={GiftIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideGift", true)}
         onValueChange={(value) => {
            settings.set("hideGift", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Create Thread"
         subLabel="Hide the Create Thread button"
         leading={<FormRow.Icon source={ThreadIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideThread", true)}
         onValueChange={(value) => {
            settings.set("hideThread", value)
         }}
            />
         }
      />
      </FormSection>
      <FormSection title="INFORMATION">
         <FormRow
         label="Check the Source Code on GitHub"
         trailing={FormRow.Arrow}
         leading={<FormRow.Icon source={GitHubIcon}/>}
         onPress={() => {
         Linking.openURL("https://github.com/SerStars/HideChatButtons")
         }}/>
      </FormSection>
         <Text style={styles.footer}>{`v${version}`}</Text>
      </ScrollView>
   )
};
// Created by mafu, modified by SerStars
import {FormRow, FormSection, FormSwitch, View, ScrollView, Image, Text} from 'enmity/components'
import {Constants, Navigation, React, StyleSheet, Dialog} from 'enmity/metro/common'
import {Linking} from "enmity/metro/common"
// @ts-ignore
import {name, version} from '../../manifest.json'
import {getIDByName} from "enmity/api/assets"

const GitHubIcon = getIDByName('img_account_sync_github_white')
const ShopIcon = getIDByName('img_collectibles_shop')
const HelpIcon = getIDByName('ic_help_24px')
const MuteIcon = getIDByName('ic_mic_muted_dark_24px')
const AppIcon = getIDByName('ic_application_command_24px')
const GiftIcon = getIDByName('ic_gift_24px')

export default ({settings}) => {
   const styles = StyleSheet.createThemedStyleSheet({
      container: {
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center"
      },
      image: {
         width: 70,
         height: 70,
         marginTop: 20,
         marginLeft: 20
      },
      title: {
         flexDirection: "column",
      },
      name: {
         fontSize: 30,
         paddingTop: 20,
         paddingLeft: 20,
         paddingRight: 30,
         color: Constants.ThemeColorMap.HEADER_PRIMARY,
      },
      author: {
         fontSize: 15,
         paddingLeft: 50,
         color: Constants.ThemeColorMap.HEADER_SECONDARY,
      },
      info: {
         height: 45,
         paddingTop: 3,
         paddingBottom: 3,
         justifyContent: "center",
         alignItems: "center"
      },
      footer: {
         color: Constants.ThemeColorMap.HEADER_SECONDARY,
         textAlign: 'center',
         paddingTop: 10,
         paddingBottom: 20
      }
   })
   return (
   <ScrollView>
   <View style={styles.container}>
   <Image source={{uri: 'https://userpfp.github.io/img/Avatars/8/861631850681729045.gif'}} style={styles.image}/>
   <View style={styles.title}>
      <Text style={styles.name}>HideChatButtons</Text>
      <Text style={styles.author}>by SerStars</Text>
   </View>
   </View>
      <FormSection title="PLUGIN SETTINGS">
         <FormRow
         label="Disable Voice Message"
         subLabel="Hide Voice Message button"
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
         subLabel="Hide App Launcher button"
         leading={<FormRow.Icon source={AppIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideLauncher", false)}
         onValueChange={(value) => {
            settings.set("hideLauncher", value)
         }}
            />
         }
      />
      <FormRow
         label="Disable Gift"
         subLabel="Hide Gift button"
         leading={<FormRow.Icon source={GiftIcon}/>}
         trailing={
      <FormSwitch
         value={settings.getBoolean("hideGift", false)}
         onValueChange={(value) => {
            settings.set("hideGift", value)
         }}
            />
         }
      />
      </FormSection>
      <FormSection title="INFORMATION">
         <FormRow
         label="Which buttons are hidden?"
         style={styles.info}
         trailing={FormRow.Arrow}
         leading={<FormRow.Icon source={HelpIcon}/>}
         onPress={() => {
            Dialog.show({
            title: `Hidden Buttons`,
            body: `- Gift Button\n- App Launcher Button\n- Record Voice Message Button\nYou can unhide Buttons by toggling their switches in the settings`,
            confirmText: "OK",
            onConfirm: () => Dialog.close
         })
         }}/>
         <FormRow
         label="Check Source Code on GitHub"
         style={styles.info}
         trailing={FormRow.Arrow}
         leading={<FormRow.Icon source={GitHubIcon}/>}
         onPress={() => {
         Linking.openURL("https://github.com/SerStars/HideChatButtons")
         }}/>
         <FormRow
         label="Find more plugins"
         style={styles.info}
         trailing={FormRow.Arrow}
         leading={<FormRow.Icon source={ShopIcon}/>}
         onPress={() => {
         Linking.openURL("https://enmity-addons.github.io")
         }}/>
      </FormSection>
         <Text style={styles.footer}>{`v${version}`}</Text>
      </ScrollView>
   )
};

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from '../constants'
import { NearbyJobs, Nearbyjobs, PopularJobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../components/"
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View>
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
            ),
              headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
              ),
              headerTitle:"", 
        }}/>
        <ScrollView showsVerticalScrollIndicator={false}>
           <View style={{
            flex:1,
            padding:SIZES.medium
           }}>
             <Welcome 
               searchTerm={searchTerm}
               setSearchTerm={setSearchTerm}

               handleClick={() => {
                if(searchTerm) {
                  router.push(`/search/${searchTerm}`)
                }
               }}
             />

             <Popularjobs/>
             <Nearbyjobs/>
           </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

};

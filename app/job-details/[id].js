import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Company, JobFooter, JobTabs, Specifics, ScreenHeaderBtn } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../components/hook/useFetch';
import About from '../../components/jobdetails/about/About';

const JobDetail = () => {
  const params = useSearchParams();
  const router = useRouter();

  const tabs = ['About', 'Qualificaion', 'Responsibilities'];

  const { data, isLoading, refetch, error } = useFetch("job-details", {
    job_id: params.id
  });


  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false)
  })


  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualificaion':
        return (
          <Specifics
            title="Qualificaion"
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        )

      case 'About':
        return (
          <About
            info={
              data[0].job_description ?? "No data provided"
            }
          />
        )

      case 'Responsibilities':
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        )

      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: ""

        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {
            isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong </Text>
            ) : data.length === 0 ? (
              <Text>No data</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data[0].employer_logo}
                  jobTitle={data[0].job_title}
                  companyName={data[0].employer_name}
                  location={data[0].job_country}
                />
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {displayTabContent()}
              </View>
            )

          }

        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https//careers.google.com/jobs/results'}/>
      </>
    </SafeAreaView>
  )
}

export default JobDetail
import { base_url } from "@/constants/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${base_url}/deals/all`);
        if (!response.ok) {
          return console.error("error", response);
        }

        setData(await response.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!data) return <Text>Loading</Text>;
  if (!data.length) return <Text>No data</Text>;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map(({ id, fields }) => (
        <View style={styles.deal} key={id}>
          <Image source={{ uri: fields.owner.logo, height: 50, width: 50 }} />
          <View style={styles.images}>
            {fields.banner_images.map((url) => (
              <Image
                key={url}
                style={styles.image}
                source={{ uri: url, height: 100, width: 100 }}
              />
            ))}
          </View>
          <Text>What: {fields.title}</Text>
          <Text>Where: {fields.owner.name}</Text>
          <Text>
            Description: {documentToReactComponents(fields.description)}
            <View>
              {fields.owned_deal_options.map((option, index) => (
                <View key={option.name} style={styles.option}>
                  <Text>Deal Option Name: {option.name}</Text>
                  <Text>Deal Option OG Price: {option.original_price}</Text>
                  <Text>
                    Deal Option Discounted Price: {option.discounted_price}
                  </Text>
                  <Text>
                    Deal Option Total Available: {option.total_available}
                  </Text>
                </View>
              ))}
            </View>
          </Text>
          <Text>People: {fields.pax}</Text>
          <View style={styles.tags}>
            <Text>Tags: </Text>
            {fields.tags.map((str) => (
              <Text key={str}>{str}</Text>
            ))}
          </View>
          <Text>
            Total Available:{" "}
            {fields.owned_deal_options.reduce(
              (acc, option) => acc + option.total_available,
              0,
            )}
          </Text>
          <Text>
            Sale dates {new Date(fields.sale_start_date).toDateString()} -{" "}
            {new Date(fields.sale_end_date).toDateString()}
          </Text>
          <Text>
            Redemption dates {new Date(fields.redeem_start_date).toDateString()}{" "}
            - {new Date(fields.redeem_end_date).toDateString()}
          </Text>
          <Text>
            Redemption Contitions:{" "}
            {documentToReactComponents(fields.redemption_conditions)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  deal: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
  },
  option: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    margin: 8,
    padding: 10,
  },
  images: {
    flexDirection: "row",
    gap: 4,
  },
  image: {
    borderRadius: 10,
  },
  tags: {
    flexDirection: "row",
  },
});

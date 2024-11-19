import { base_url } from "@/constants/api";
import { ApiDeal } from "@/shared/types/deals";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

export default function Deal() {
  const { dealId } = useLocalSearchParams();

  const [data, setData] = useState<ApiDeal>();

  useEffect(() => {
    (async () => {
      try {
        // Something in here about checking RQ cache before requesting
        const response = await fetch(`${base_url}/deals/${dealId}`);
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
  if (!data.fields) return <Text>Empty</Text>;

  const { id, fields } = data;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/" style={styles.link}>
        Back
      </Link>
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
          Redemption dates {new Date(fields.redeem_start_date).toDateString()} -{" "}
          {new Date(fields.redeem_end_date).toDateString()}
        </Text>
        <Text>
          Redemption Contitions:{" "}
          {documentToReactComponents(fields.redemption_conditions)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  link: {
    backgroundColor: "lightgrey",
    padding: 8,
    borderRadius: 10,
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

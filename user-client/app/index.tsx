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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.deals.map((deal, index: number) => (
        <View style={styles.deal} key={deal.title}>
          <Image source={{ uri: deal.owner.logo, height: 50, width: 50 }} />
          <View style={styles.images}>
            {deal.banner_images.map((url) => (
              <Image
                key={url}
                style={styles.image}
                source={{ uri: url, height: 100, width: 100 }}
              />
            ))}
          </View>
          <Text>Deal {index + 1}</Text>
          <Text>What: {deal.title}</Text>
          <Text>Where: {deal.owner.name}</Text>
          <Text>
            Description: {documentToReactComponents(deal.description)}
          </Text>
          <Text>
            OG Price: {deal.currency}
            {deal.original_price}
          </Text>
          <Text>
            Sale Price: {deal.currency}
            {deal.discounted_price}
          </Text>
          <Text>People: {deal.pax}</Text>
          <View style={styles.tags}>
            <Text>Tags: </Text>
            {deal.tags.map((str) => (
              <Text key={str}>{str}</Text>
            ))}
          </View>
          <Text>Total Available: {deal.total_available}</Text>
          <Text>
            Sale dates {new Date(deal.sale_start_date).toDateString()} -{" "}
            {new Date(deal.sale_end_date).toDateString()}
          </Text>
          <Text>
            Sale dates {new Date(deal.redeem_start_date).toDateString()} -{" "}
            {new Date(deal.redeem_end_date).toDateString()}
          </Text>
          <Text>
            Redemption Contitions:{" "}
            {documentToReactComponents(deal.redemption_conditions)}
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

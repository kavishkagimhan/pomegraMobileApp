import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import HAppy from 'react-native-vector-icons/Entypo';
import Sad from 'react-native-vector-icons/Entypo';
import Qus from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const DiseaseResult = ({ route }) => {
  const { validate, disease, emoji } = route.params;
  const [showTreatmentBox, setShowTreatmentBox] = useState(false);

  const getTreatment = (diseaseName) => {
    switch (diseaseName) {
      case 'Bacterial Blight':
        return `
          Bacterial Blight Treatment
          Sprays containing 500 ppm Streptocycline and 0.2% copper oxychloride, or 500 ppm Bromopal and 0.2% copper oxychloride, successfully controlled blight and increased yield.`;

      case 'Anthracnose':
        return `
          Anthracnose Treatment
          Apply fungicides preventively, especially during periods of high disease pressure or favorable weather conditions for fungal growth.`;

      case 'Cercospora Leaf Spot':
        return `
          Cercospora Leaf Spot Treatment
          Fungicides can help manage Cercospora Leaf Spot. Copper-based fungicides and fungicides containing active ingredients like azoxystrobin can be effective.`;

      default:
        return '';
    }
  };

  const handleGetTreatment = () => {
    setShowTreatmentBox(!showTreatmentBox);
  };

  const treatmentInfo = getTreatment(disease);

  return (
    <View className="w-screen h-screen text-white bg-emerald-600">
      <Text className="justify-center py-6 text-3xl font-semibold text-center text-white">Results</Text>
      <View className="flex items-center">
        {validate !== undefined && (
          <Text className="justify-center text-2xl text-center text-white">You Uploaded {validate} Image</Text>
        )}
        {validate !== 'healthy' && validate !== "undefined" && (
          <Text className="p-4 text-xl text-center text-white jjustify-center">This Disease is "<Text className="text-xl font-bold">{disease}</Text>"</Text>
        )}
        <HAppy name={emoji} color="white" size={80} />
      </View>
      <View className="items-center mt-6 ">
        {validate !== 'healthy' && validate !== "undefined" && (
          <TouchableOpacity className="mt-4" onPress={handleGetTreatment}>
            <View style={{ elevation: 10 }} className="bg-white px-4 py-2 rounded-2xl w-[250px] items-center">
              <Text className="text-lg text-green-800">Get Treatment</Text>
            </View>
          </TouchableOpacity>
        )}

        {showTreatmentBox && (
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 10, borderRadius: 5 }} className="w-[85vw] p-4 text-left text-lg">
            <Text>{treatmentInfo}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default DiseaseResult;

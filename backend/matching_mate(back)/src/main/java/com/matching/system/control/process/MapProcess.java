package com.matching.system.control.process;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.stereotype.Component;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

@Component
public class MapProcess {
    public static String coordToAddr(double x, double y) {
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x="+x+"&y="+y+"&input_coord=WGS84";

        String processAddress = "";
        try{
            String address = getRegionAddress(getJSONData(url));

            String[] splitAddress = address.split(" ");

            processAddress = splitAddress[0] + " " + splitAddress[1] + " " + splitAddress[2];
        }catch(Exception e){
            e.printStackTrace();
        }
        return processAddress;
    }

    private static String getJSONData(String apiUrl) throws Exception {
        final String API_KEY = "8ba96febc207f454673084f12859d2b3";

        String jsonString = new String();
        String buf;
        URL url = new URL(apiUrl);
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
        String auth = "KakaoAK "+ API_KEY;
        conn.setRequestMethod("GET");
        conn.setRequestProperty("X-Requested-With", "curl");
        conn.setRequestProperty("Authorization", auth);

        BufferedReader br = new BufferedReader(new InputStreamReader(
                conn.getInputStream(), "UTF-8"));
        while ((buf = br.readLine()) != null) {
            jsonString += buf;
        }
        return jsonString;
    }

    private static String getRegionAddress(String jsonString) {
        String value = "";
        JSONObject jObj = (JSONObject) JSONValue.parse(jsonString);
        JSONObject meta = (JSONObject) jObj.get("meta");
        long size = (long) meta.get("total_count");
        if(size>0){
            JSONArray jArray = (JSONArray) jObj.get("documents");
            JSONObject subJobj = (JSONObject) jArray.get(0);
            JSONObject address = (JSONObject) subJobj.get("address");

            value = (String) address.get("address_name");
//            JSONObject roadAddress =  (JSONObject) subJobj.get("road_address");
//            if(roadAddress == null){
//                JSONObject subsubJobj = (JSONObject) subJobj.get("address");
//                value = (String) subsubJobj.get("address_name");
//            }else{
//                value = (String) roadAddress.get("address_name");
//            }
//            if(value.equals("") || value==null){
//                subJobj = (JSONObject) jArray.get(1);
//                subJobj = (JSONObject) subJobj.get("address");
//                value =(String) subJobj.get("address_name");
//            }
        }
        return value;
    }
}

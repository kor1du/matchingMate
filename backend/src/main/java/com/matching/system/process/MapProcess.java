package com.matching.system.process;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.stereotype.Component;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;

@Component
public class MapProcess {
    private static final String API_KEY = "8ba96febc207f454673084f12859d2b3";

    public static String coordToAddr(double x, double y) {
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x="+x+"&y="+y+"&input_coord=WGS84";

        try{
            return getRegionAddress(getJSONData(url));
        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }

    private static String getJSONData(String apiUrl) throws Exception {


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

            value = address.get("region_1depth_name") + " " + address.get("region_2depth_name") + " " + address.get("region_3depth_name");
        }
        return value;
    }

    public static Float[] AddrToCoord(String address) {
        try{
            String url = "http://dapi.kakao.com/v2/local/search/address.json?query=" + URLEncoder.encode(address, "UTF-8");

            return getCoord(getJson(url));

        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }

    private static String getJson(String api)
    {
        try {
            URL obj = new URL(api);
            String auth = "KakaoAK "+ API_KEY;
            HttpURLConnection con = (HttpURLConnection)obj.openConnection(); //get으로 받아오면 된다. 자세한 사항은 카카오개발자센터에 나와있다.
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", auth);
            con.setRequestProperty("content-type", "application/json");
            con.setDoOutput(true); con.setUseCaches(false); con.setDefaultUseCaches(false);
            Charset charset = Charset.forName("UTF-8");

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), charset)); String inputLine;
            StringBuffer response = new StringBuffer(); while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }

            return response.toString();
        } catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }

    private static Float[] getCoord(String jsonString) {


        JSONObject jObj = (JSONObject) JSONValue.parse(jsonString);
        JSONObject meta = (JSONObject) jObj.get("meta");
        long size = (long) meta.get("total_count");
        if(size>0){
            JSONArray jArray = (JSONArray) jObj.get("documents");
            JSONObject subJobj = (JSONObject) jArray.get(0);
            JSONObject address = (JSONObject) subJobj.get("address");

            Float[] coords = new Float[2];
            coords[0] = Float.parseFloat(address.get("x").toString());
            coords[1] = Float.parseFloat(address.get("y").toString());

            return coords;
        }
        return null;
    }

}

package com.matching.system.process;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@Component
public class ImageProcess {
    private final String API_KEY = "fca9e378a2116dae3e8e425ae77e058d";
    public String getImageUrl(String name, MultipartFile multipartFile) {

        String apiUrl = "https://api.imgbb.com/1/upload?key=" + API_KEY;

        String imageUrl = "";

        try {
            imageUrl = uploadImage(apiUrl, name, multipartFile);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return imageUrl;
    }

    private String uploadImage(String apiUrl, String name, MultipartFile multipartFile) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        String changeName = changeName(name, multipartFile);
        String imageEncoding = Base64.getEncoder().encodeToString(multipartFile.getBytes());

        System.out.println("changeName = " + changeName);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("key", API_KEY);
        body.add("name", changeName);
        body.add("image", imageEncoding);

        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        HttpEntity<String> response = restTemplate.postForEntity(apiUrl, requestMessage, String.class);

        JSONObject jObj = (JSONObject) JSONValue.parse(response.getBody());
        JSONObject subJobj = (JSONObject) jObj.get("data");
        JSONObject subSubJobj = (JSONObject) subJobj.get("image");

        String imageUrl = (String) subSubJobj.get("url");


        return imageUrl;
    }

    private String changeName(String userId, MultipartFile multipartFile) throws IOException {
        int i = -1;
        i = multipartFile.getOriginalFilename().lastIndexOf("."); // 파일 확장자 위치

        Date now = new Date(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        String fileName = simpleDateFormat.format(now) + userId + multipartFile.getOriginalFilename().substring(i);

        return fileName;
    }
}

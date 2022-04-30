package com.matching.system.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ResponseData {
    private HttpStatus status;
    private String message;
    private Object data;

}
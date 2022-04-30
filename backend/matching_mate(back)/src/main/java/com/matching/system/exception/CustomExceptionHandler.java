package com.matching.system.exception;

import com.matching.system.filter.ResponseError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class CustomExceptionHandler {

    @ExceptionHandler(NullPointerException.class)
    protected ResponseEntity handleNotFoundError(String message)
    {
        ResponseError responseError =  new ResponseError(HttpStatus.NOT_FOUND, message);

        return ResponseEntity
             .badRequest()
             .body(responseError);
    }


}

package com.matching.system.domain;


import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, ReportType> {
    @Override
    public ReportType convert(String source) {
        try {
            return ReportType.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}

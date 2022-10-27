package br.com.tcc.validators;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class CustomerValidator {
    
    @NotNull
    @Length(min = 1, max = 255)
    private String name;

    @NotNull
    @Length(min = 1, max = 255)
    private String email;

    @NotNull
    private Long document;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Long getDocument() {
        return document;
    }
}

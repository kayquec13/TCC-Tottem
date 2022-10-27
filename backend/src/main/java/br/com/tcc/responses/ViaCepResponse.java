package br.com.tcc.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ViaCepResponse {

    private String cep;
    @JsonProperty(value = "logradouro")
    private String street;
    @JsonProperty(value = "bairro")
    private String neighborhood;
    @JsonProperty(value = "localidade")
    private String city;
    @JsonProperty(value = "erro")
    private boolean error;

    public String getCep() {
        return cep;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public boolean getError() {
        return error;
    }
}

package br.com.tcc.dtos;

public class MessageDTO {
    
    private String message;

    public MessageDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

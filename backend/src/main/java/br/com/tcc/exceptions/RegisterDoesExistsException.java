package br.com.tcc.exceptions;

public class RegisterDoesExistsException extends Exception {

    public RegisterDoesExistsException(String message) {
        super(message);
    }
}

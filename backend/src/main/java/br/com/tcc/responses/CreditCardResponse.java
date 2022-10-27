package br.com.tcc.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class CreditCardResponse {

    @JsonProperty(value = "last_digits")
    private Integer lastDigits;

    @JsonProperty(value = "due_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/yyyy")
    private Date dueDate;

    @JsonProperty(value = "customer_name")
    private String customerName;

    @JsonProperty(value = "plan_code")
    private Integer planCode;

    public Integer getLastDigits() {
        return lastDigits;
    }

    public void setLastDigits(Integer lastDigits) {
        this.lastDigits = lastDigits;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getPlanCode() {
        return planCode;
    }

    public void setPlanCode(Integer planCode) {
        this.planCode = planCode;
    }
}

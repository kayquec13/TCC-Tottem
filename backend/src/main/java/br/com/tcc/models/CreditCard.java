package br.com.tcc.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="credit_cards")
public class CreditCard {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "due_date", nullable = false)
    private Date dueDate;

    @Column(name = "last_digits", nullable = false)
    private Integer lastDigits;

    @Column(name = "plan_code", nullable = false)
    private Integer planCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    public Long getId() {
        return id;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public CreditCard setDueDate(Date dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public Integer getLastDigits() {
        return lastDigits;
    }

    public CreditCard setLastDigits(Integer lastDigits) {
        this.lastDigits = lastDigits;
        return this;
    }

    public Integer getPlanCode() {
        return planCode;
    }

    public CreditCard setPlanCode(Integer planCode) {
        this.planCode = planCode;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CreditCard setCustomer(Customer customer) {
        this.customer = customer;
        return this;
    }
}

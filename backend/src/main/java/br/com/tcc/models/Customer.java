package br.com.tcc.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Id;

@Entity
@Table(name="customers")
public class Customer {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false, unique=true)
    private Long document;

    @Column(nullable=false)
    private String photo;

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

    public Customer setName(String name) {
        this.name = name;
        return this;
    }

    public String getName() {
        return name;
    }

    public Customer setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Customer setDocument(Long document) {
        this.document = document;
        return this;
    }

    public Long getDocument() {
        return document;
    }

    public Customer setPhoto(String photoFileName) {
        this.photo = photoFileName;
        return this;
    }

    public String getPhoto() {
        return photo;
    }

}

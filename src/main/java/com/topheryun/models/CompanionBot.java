package com.topheryun.models;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class CompanionBot {
	
	@Id
	private String userId;
	private int affection;
	private char gender;

}

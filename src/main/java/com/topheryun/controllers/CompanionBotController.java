package com.topheryun.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.topheryun.models.CompanionBot;
import com.topheryun.services.ICompanionBotService;

@RestController @CrossOrigin
public class CompanionBotController {

	private ICompanionBotService companionBotService;
	public CompanionBotController(ICompanionBotService companionBotService) {
		this.companionBotService = companionBotService;
	}
	
	@PostMapping() 
	public void saveConfiguration(@RequestBody CompanionBot companionBot) {
		companionBotService.saveConfiguration(companionBot);
		System.out.println("Configuration Updated");
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<CompanionBot> getConfiguration(@PathVariable("userId") String userId) {
		CompanionBot companionBot = companionBotService.findByUserId(userId);
		if (companionBot == null)
			return ResponseEntity.status(418).build();
		else return ResponseEntity.status(200).body(companionBot);
	}
	
}

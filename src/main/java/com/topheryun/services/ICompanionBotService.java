package com.topheryun.services;

import com.topheryun.models.CompanionBot;

public interface ICompanionBotService {

	public void saveConfiguration(CompanionBot companionBot);
	public CompanionBot findByUserId(String userId);

}

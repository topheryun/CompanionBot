package com.topheryun.services.impl;

import org.springframework.stereotype.Service;

import com.topheryun.daos.ICompanionBotDAO;
import com.topheryun.models.CompanionBot;
import com.topheryun.services.ICompanionBotService;

@Service
public class CompanionBotServiceImpl implements ICompanionBotService {

	private ICompanionBotDAO companionBotDAO;
	public CompanionBotServiceImpl(ICompanionBotDAO companionBotDAO) {
		this.companionBotDAO = companionBotDAO;
	}
	
	@Override
	public void saveConfiguration(CompanionBot companionBot) {
		companionBotDAO.save(companionBot);
	}

	@Override
	public CompanionBot findByUserId(String userId) {
		return companionBotDAO.findByUserId(userId);
	}

}

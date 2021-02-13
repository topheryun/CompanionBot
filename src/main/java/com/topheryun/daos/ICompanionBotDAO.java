package com.topheryun.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topheryun.models.CompanionBot;

public interface ICompanionBotDAO extends JpaRepository<CompanionBot,String> {

	public CompanionBot findByUserId(String userId);

}

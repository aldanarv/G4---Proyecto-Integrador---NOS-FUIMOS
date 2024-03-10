package com.grupo4.nos_fuimos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class NosFuimosApplication {

	public static void main(String[] args) {
		SpringApplication.run(NosFuimosApplication.class, args);
	}
}

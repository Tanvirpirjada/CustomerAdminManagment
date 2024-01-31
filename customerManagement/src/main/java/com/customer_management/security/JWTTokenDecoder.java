package com.customer_management.security;

	
import java.io.UnsupportedEncodingException;

import org.apache.commons.codec.binary.Base64;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JWTTokenDecoder {
	
	 String name;
	 String email;
	 String picture;
	
	public static JWTTokenDecoder getDecoded(String encodedToken) throws UnsupportedEncodingException  {
	
	    String[] pieces = encodedToken.split("\\.");
	
		String b64payload = pieces[1];
		
		String jsonString = new String(Base64.decodeBase64(b64payload), "UTF-8");
	
	
	    return new Gson().fromJson(jsonString, JWTTokenDecoder.class);
	
	}
	
	
	public String toString() {
	
	    Gson gson = new GsonBuilder().setPrettyPrinting().create();
	
	    return gson.toJson(this);
	
	}

}

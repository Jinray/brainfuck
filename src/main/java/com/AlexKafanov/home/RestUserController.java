package com.AlexKafanov.home;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;


@RestController
public class RestUserController {

    @RequestMapping("/resource")
    public Map<String,Object> home(Principal principal) {
        Map<String,Object> model = new HashMap<String,Object>();
        model.put("content", principal.getName());
        return model;
    }}
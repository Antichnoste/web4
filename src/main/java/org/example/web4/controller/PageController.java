package org.example.web4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

    @RequestMapping({"/", "/main"})
    public String start(){
        return "index.html";
    }
}

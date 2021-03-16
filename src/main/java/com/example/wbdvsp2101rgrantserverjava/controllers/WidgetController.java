package com.example.wbdvsp2101rgrantserverjava.controllers;


import com.example.wbdvsp2101rgrantserverjava.models.Widget;
import com.example.wbdvsp2101rgrantserverjava.services.WidgetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

  @Autowired
  WidgetService service;

  @GetMapping( "/api/widgets" )
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping( "/api/topics/{tid}/widgets" )
  public List<Widget> findAllWidgetsForTopic (
          @PathVariable("tid") String topicId
  ) {
    return service.findAllWidgetsForTopic( topicId );
  }


}

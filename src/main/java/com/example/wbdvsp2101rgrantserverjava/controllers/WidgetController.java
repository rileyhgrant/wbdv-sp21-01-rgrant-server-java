package com.example.wbdvsp2101rgrantserverjava.controllers;


import com.example.wbdvsp2101rgrantserverjava.models.Widget;
import com.example.wbdvsp2101rgrantserverjava.services.WidgetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

  @Autowired
  WidgetService service;



  // GETS
  // ======

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



  // POSTS
  // ======

  @PostMapping( "/api/topics/{tid}/widgets" )
  public Widget createWidget(
          @PathVariable("tid") String topicId,
          @RequestBody Widget w
  ) {
    return service.createWidget( topicId, w );
  }

  // PUTS
  // ======
  @PutMapping( "/api/widgets/{wid}" )
  public Integer updateWidget(
          @PathVariable("wid") Long widgetId,
          @RequestBody Widget w
  ) {
    return service.updateWidget( widgetId, w);
  }




          // DELETE
  // ======

  @DeleteMapping( "/api/widgets/{wid}" )
  public Integer deleteWidget(
          @PathVariable("wid") Long widgetId
  ) {
    return service.deleteWidget( widgetId );
  }


}

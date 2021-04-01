package com.example.wbdvsp2101rgrantserverjava.services;

import com.example.wbdvsp2101rgrantserverjava.models.Widget;
import com.example.wbdvsp2101rgrantserverjava.repositories.WidgetRepository;
import com.sun.xml.bind.v2.TODO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class WidgetService {

  @Autowired
  WidgetRepository repository;

  private List<Widget> widgets = new ArrayList<Widget>();
  {
    // Dummy value all associated with a non-existent topic ID in the real data. Ima leave this
    //   kinda just because.
    Widget w1 = new Widget( 123l, "ABC123", "HEADING", 1, "Widgets for topic ABC");
    Widget w2 = new Widget( 234l, "ABC123", "PARAGRAPH", 1, "Lorem Ipsum");
    Widget w3 = new Widget( 345l, "ABC234", "HEADING", 2, "Welcome to Widget List!");
    Widget w4 = new Widget( 456l, "ABC234", "PARAGRAPH", 1, "Lorem Ipsum");
    Widget w5 = new Widget( 567l, "ABC234", "PARAGRAPH", 1, "Idkkkk");

    widgets.add(w1);
    widgets.add(w2);
    widgets.add(w3);
    widgets.add(w4);
    widgets.add(w5);
  }



  public Widget createWidget( String topicId, Widget w ) {

    // run the interface's create
    w.setTopicId( topicId );
    return repository.save( w );

//    w.setId(new Date().getTime());
//    widgets.add( w );
//    return w;
  }


  public List<Widget> findWidgetsForTopic( String topicId ) {

    // run a SQL statement with a 'where' clause to find all by an id
    //   from custom method in our repository
    return repository.findWidgetsForTopic( topicId );

//    List<Widget> ws = new ArrayList<Widget>();
//    for ( Widget w : widgets ) {
//      if (w.getTopicId().equals( topicId )) {
//        ws.add( w );
//      }
//    }
//    return ws;
  }


  public Integer updateWidget( Long widgetId, Widget w ) {

    // TODO: Error check
    Widget ogWidget = repository.findById( widgetId ).get();

    // name
//    if ( !w.getName().equals( null )) {
//      ogWidget.setName( w.getName() );
//    }

    // topicId
//    if ( !w.getTopicId().equals( null )) {
//      ogWidget.setTopicId( w.getTopicId() );
//    }

    // type
    if ( w.getType() != null) {
      ogWidget.setType( w.getType() );
    }

    // widgetOrder
//    if ( !w.getWidgetOrder().equals( null )) {
//      ogWidget.setWidgetOrder( w.getWidgetOrder() );
//    }

    // size
    if ( w.getSize() != null) {
      ogWidget.setSize( w.getSize() );
    }

    // text
    if ( w.getText() != null) {
      ogWidget.setText( w.getText() );
    }

    // urlRef
    if ( w.getUrlRef() != null) {
      ogWidget.setUrlRef( w.getUrlRef() );
    }

    // width
    if ( w.getWidth() != null) {
      ogWidget.setWidth( w.getWidth() );
    }

    // height
    if ( w.getHeight() != null) {
      ogWidget.setHeight( w.getHeight() );
    }

    // cssClass
//    if ( !w.getCssClass().equals( null )) {
//      ogWidget.setCssClass( w.getCssClass() );
//    }

    // style
//    if ( !w.getStyle().equals( null )) {
//      ogWidget.setStyle( w.getStyle() );
//    }

    // value
//    if ( !w.getValue().equals( null )) {
//      ogWidget.setValue( w.getValue() );
//    }

    // ordered
    if (w.getOrdered() != null) {
      ogWidget.setOrdered( w.getOrdered() );
    }


    // save this new widget to the database
    repository.save( ogWidget );

    // return 1 for success
    return 1;


//    for( int i = 0; i < widgets.size(); i++ ) {
//      if(widgets.get(i).getId().equals(widgetId)) {
//        widgets.set(i, w);
//        return 1;
//      }
//    }
//    return -1;
  }



  public Integer deleteWidget( Long widgetId ) {

    // run the interface's delete, return 1
    repository.deleteById( widgetId );
    return 1;

//    for( int i = 0; i < widgets.size(); i++ ) {
//      if(widgets.get(i).getId().equals(widgetId)) {
//        widgets.remove(i);
//        return 1;
//      }
//    }
//    return -1;
  }

  public List<Widget> findAllWidgets() {
    // use the repository method, and cast it to a List<Widget>
    return (List<Widget>) repository.findAll();
//    return widgets;
  }


  // TODO: Gotta do some shiz
  public Widget findWidgetById( Long widgetId ) {
    for( int i = 0; i < widgets.size(); i++ ) {
      if(widgets.get(i).getId().equals(widgetId)) {
        return widgets.get(i);
      }
    }
    return null;
  }











}

package map.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MapController {

    @ResponseBody
    @RequestMapping("/map")
    public ModelAndView map(){
        return new ModelAndView("/map");
    }
}

//kapsla Start
(function () {

    
    jQuery(function ($){
        // VAR
        var _currentHuvudomradeID = $('#currentTID').html(); // div id= currentTID
        var _tmpomradesNamn = $('.omradesnamn li').html();
        var _omradesNamn = $.trim(_tmpomradesNamn);
        var _valdSortering="";
        var _drpFilter = $('#drpFilter');

        var localOrServerURL = "http://www.kulturivast.se"; //"http://kulturivast.se.preview.binero.se" ; "http://kivdev.monoclick-dev.se"; //"http://dev.kulturivast.se.www359.your-server.de";  webservern att hämta data ifrån
        //var mozaikItems = [];
        var _drphuvudomradenlista = [];
        var _drphuvudomradenvalue = [];        
        var _breadcrumbval = [];
        var _breadcrumbindex = [];

        var _renderDOMList = "";
        var _renderDrpList = "";
        var _filtreranamn = "Avgränsa";
        

        // OBJECT LITERALS
        var _RenderOutputListObj = {
            rubrik: "",
            overrub: "",
            ingress: "",
            huvudomrade: "",
            kategoritaggning: "",
            datum: "",
            link: "",
            bild: "",
            extra: "",
            btntyp: "", 
            btntitle: "", 
            btnlink: "",
            anktuellt:""
        }

        var _RenderOutputdrpObj = {
            namn: "",
            value: ""   
        }

        // WEBSERVICE START
        function kivSearchJsonData(searchstr, callback) {
            var serverrequest = "";
            switch (_valdSortering) {
                case "datum":
                    serverrequest = localOrServerURL + "/json-kivsearch_sort-by-day/" + searchstr + "?callback=?";
                    break;
                case "titel":
                    serverrequest = localOrServerURL + "/json-kivsearch_sort-by-title/" + searchstr + "?callback=?";
                    break;
                case "aktuellt":
                    serverrequest = localOrServerURL + "/json-kivsearch/" + searchstr + "?callback=?";
                    break;
                default :
                    serverrequest = localOrServerURL + "/json-kivsearch/" + searchstr + "?callback=?";                  
            }
            
            $.ajax({
                type: "GET",
                url: serverrequest,
                dataType: "jsonp",
                success: function (data) {
                    //var currentdomitems = "";
                    
                    //for (var x = 0; x < data.kivsearch.length; x++) {

                    //    _RenderOutputListObj.bild = data.kivsearch[x].kivsearchitem.bild;
                    //    _RenderOutputListObj.overrub = data.kivsearch[x].kivsearchitem.overrub;
                    //    _RenderOutputListObj.rubrk = data.kivsearch[x].kivsearchitem.rubrik;
                    //    _RenderOutputListObj.link = data.kivsearch[x].kivsearchitem.link;
                    //    _RenderOutputListObj.ingress = data.kivsearch[x].kivsearchitem.ingress;
                    //    _RenderOutputListObj.aktuellt = data.kivsearch[x].kivsearchitem.aktuellt;
                    //    _RenderOutputListObj.btntyp = data.kivsearch[x].kivsearchitem.btntyp;
                    //    _RenderOutputListObj.btntitle = data.kivsearch[x].kivsearchitem.btntitle;
                    //    _RenderOutputListObj.btnlink = data.kivsearch[x].kivsearchitem.btnlink;
                    //    currentdomitems += Renderdata(_RenderOutputListObj);

                    //};
                   
                    //_renderDOMList = currentdomitems;
                    var currentdomitems = PrioriteringsSortera(data, function (sorteradlista) {

                        return sorteradlista;
                    });

                    callback(currentdomitems);
                    removePlussicon();
                    return false;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                   // alert("Nått blev fel!"); // <-- skicka error json !!!!

                }
            });                     
            
        };

        // listar alla huvudområdena i en dropdown lista
        var initomradesdrp = function (omradesid) {
            var serverrequest = localOrServerURL + "/json-kivsearch-cat/" + omradesid + "?callback=?";
            
            $.ajax({
                type: "GET",
                url: serverrequest,
                dataType: "jsonp",
                success: function (data) {

                    var currentdomitems = "";
                    var removedubbletter=[];
                    
                    AddFilterdrpInit();

                    for (var x = 0; x < data.kivsearch.length; x++) {
                        var tid = data.kivsearch[x].kivomraden.tid;
                        if (removedubbletter.length > 0) {
                            if (removedubbletter.indexOf(tid) == -1) {
                                _RenderOutputdrpObj.namn = data.kivsearch[x].kivomraden.kategoritaggning;
                                _RenderOutputdrpObj.value = tid;
                                removedubbletter.push(tid);

                                if (_breadcrumbindex.indexOf(tid) == -1) {
                                    AddOmradenToDrp(_RenderOutputdrpObj.value, _RenderOutputdrpObj.namn);
                                };                                
                            }

                        } else {
                            _RenderOutputdrpObj.namn = data.kivsearch[x].kivomraden.kategoritaggning;
                            _RenderOutputdrpObj.value = tid;
                            removedubbletter.push(tid);
                            if (_breadcrumbindex.indexOf(tid) == -1) {
                                AddOmradenToDrp(_RenderOutputdrpObj.value, _RenderOutputdrpObj.namn);
                            };
                        }
                       
                    };
                    AddOmradenToDrp(_currentHuvudomradeID, "Visa alla");//lägg till visa alla Sist;
                    
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert("Nått blev fel!"); // <-- skicka error json !!!!

                }
            });

            return false;

        }
        // WEBSERVICE END

        // SORTERINGS HELPER FUNCTIONS --START
        //Sortera efter prioriterings 
        var PrioriteringsSortera = function(osorteraddata, callback){

            //returvärde
            var currentdomitems = "";
            
            // temp Arrayer
            var MainCategoryReturnArray = [];
            var MainCategoryArray = [];
            var RelatedCategoryArray = [];

           
        // loopa igenom alla items i inkommande osorteratdata
            for (var x = 0; x < osorteraddata.kivsearch.length; x++) {
                console.log("i första loopen nr=" + x);
                //för varje item tmp lagra testvärden
                var tmpcurrhuvudomr = osorteraddata.kivsearch[x].kivsearchitem.huvudomrade;
                var isAktuell = osorteraddata.kivsearch[x].kivsearchitem.aktuellt;

                var cur_valt_huvudomrade = _tmpomradesNamn.trim()

                //kolla vilken array item ska hamna i
                //om huvudområdet är samma som sidans område
                if (tmpcurrhuvudomr == cur_valt_huvudomrade) {
					
                    //kolla om det är aktuellt och skall visas övers i huvudlistan eller inte
                    if (isAktuell=="1"){
                        MainCategoryArray.unshift(osorteraddata.kivsearch[x]);
						
                    }else{
                        MainCategoryArray.push(osorteraddata.kivsearch[x]);
                    } 
					
                }else{		
                    
                    //kolla om det är aktuellt och skall visas övers i Relateradelistan eller inte
                    if (isAktuell == "1") {
                        osorteraddata.kivsearch[x].kivsearchitem.aktuellt = 0;
                        RelatedCategoryArray.unshift(osorteraddata.kivsearch[x]);
						
                    }else{
                        RelatedCategoryArray.push(osorteraddata.kivsearch[x]);
                    } 					
                }	
            };
                //Slå ihop arrayerna så att ordningen blir rätt
                MainCategoryReturnArray = MainCategoryArray.concat(RelatedCategoryArray)

                for (var item in MainCategoryReturnArray) {
                  
                    if (!MainCategoryReturnArray.hasOwnProperty(item)) continue;

                    var obj = MainCategoryReturnArray[item];
                    for (var prop in obj) {
                        // skip loop if the property is from prototype
                        if (!obj.hasOwnProperty(prop)) continue;

                        console.log("i Andra loopen");
                        _RenderOutputListObj.bild = obj[prop].bild;
                        _RenderOutputListObj.overrub = obj[prop].overrub;
                        _RenderOutputListObj.rubrk = obj[prop].rubrik;
                        _RenderOutputListObj.link = obj[prop].link;
                        _RenderOutputListObj.ingress = obj[prop].ingress;
                        _RenderOutputListObj.aktuellt = obj[prop].aktuellt;
                        _RenderOutputListObj.btntyp = obj[prop].btntyp;
                        _RenderOutputListObj.btntitle = obj[prop].btntitle;
                        _RenderOutputListObj.btnlink = obj[prop].btnlink;
                        currentdomitems += Renderdata(_RenderOutputListObj);
                        console.log(prop + " = " + obj[prop].bild);

                    }
                }



                //for (var i = 0; i < MainCategoryReturnArray.length; i++) {  
                //    console.log("i Andra loopen (i) nr="+ i);
                //    _RenderOutputListObj.bild = MainCategoryReturnArray[i].object.bild;
                //    _RenderOutputListObj.overrub = MainCategoryReturnArray[i].kivsearchitem.overrub;
                //    _RenderOutputListObj.rubrk = MainCategoryReturnArray[i].kivsearchitem.rubrik;
                //    _RenderOutputListObj.link = MainCategoryReturnArray[i].kivsearchitem.link;
                //    _RenderOutputListObj.ingress = MainCategoryReturnArray[i].kivsearchitem.ingress;
                //    _RenderOutputListObj.aktuellt = MainCategoryReturnArray[i].kivsearchitem.aktuellt;
                //    _RenderOutputListObj.btntyp = MainCategoryReturnArray[i].kivsearchitem.btntyp;
                //    _RenderOutputListObj.btntitle = MainCategoryReturnArray[i].kivsearchitem.btntitle;
                //    _RenderOutputListObj.btnlink = MainCategoryReturnArray[i].kivsearchitem.btnlink;
                //    currentdomitems += Renderdata(_RenderOutputListObj);

                //};

           return callback(currentdomitems);

        }

        //SORTERINGS HELPER FUNCTIONS --- END


        var Renderdata = function (incRenderOutputObj) {
            var tmpstr ="";
            
                tmpstr += "<div class='large-4 medium-6 small-12 columns item callout-card aktuellt'>";
                if (incRenderOutputObj.aktuellt) {
                    if (incRenderOutputObj.aktuellt > 0) {
                        tmpstr += "<div class='card-label'><div class='label-text'>Aktuellt</div></div>";
                    }
                }
                tmpstr += "<div class='mozaikimg listheight'>";
                tmpstr += "<a href='" + incRenderOutputObj.link + "'><img src='" + incRenderOutputObj.bild + "' /></a></div>";
                tmpstr += "<div class='mozaikitems'><div class='row'>";
                tmpstr += "<div class='small-10 columns listheight'><a href='" + incRenderOutputObj.link + "'><h5>" + incRenderOutputObj.overrub + "</h5><h4>" + incRenderOutputObj.rubrk + "</h4></a>";
                tmpstr += "<div class='apsisbtnbox'><a href='" + incRenderOutputObj.btnlink + "' class='button expand success " + incRenderOutputObj.btntyp + "'>" + incRenderOutputObj.btntitle + "</a></div></div>";
                tmpstr += "<div class='small-2 columns listheight'><a href='' class='showingresstext'>";
                if (incRenderOutputObj.ingress) {
                    tmpstr += "<i class='closed'><img alt='Visa' src='" + localOrServerURL + "/sites/all/themes/kivnew/images/MosaikPlus28.png'></i>";
                }                
                tmpstr += "</a></div>";
                tmpstr += "<div class='medium-12 columns ingresstext'>" + incRenderOutputObj.ingress + "</div></div></div></div>";

                
           return tmpstr;
        };

      
        // FUNKTIONER
        var RenderDomItem = function (renderitem) {
            $('#kivisotope .wrapper').html(""); //remove all child nodes   
            $('#kivisotope .wrapper').html(renderitem);
           
            $('.kivisotope').isotope("destroy");
            $('.kivisotope').isotope({
                itemSelector: '.item',                
                masonry: {
                    // use element for option
                    columnWidth: 250
                }
            });
            $('.loader').hide();
            return false;
        }

        var FilterRender = function () {
            // gör filtrering
            var tmpstrlist = "";
            for (index = 0; index < _breadcrumbindex.length; ++index) {
                if (index == 0) {
                    tmpstrlist += _breadcrumbindex[index];
                } else {
                    tmpstrlist += "," + _breadcrumbindex[index];
                }
            }
            var getomrviaAjax = "";

            if (tmpstrlist) {
                getomrviaAjax = _currentHuvudomradeID + "," + tmpstrlist;
            } else {
                getomrviaAjax = _currentHuvudomradeID;
            };
            
            kivSearchJsonData(getomrviaAjax, function (datat) {
                
                initomradesdrp(getomrviaAjax);// lägger till alla kopplade länkar                
                RenderDomItem(datat);
            });            
        };

        var ResetFilter = function () {
            $("#breadcrumbval").empty();
            $("#breadcrumbval").append("<li><a href=''class='removebreadcrumbval' rel=''>Visa alla</a></li>");
            _drpFilter.empty();
            _breadcrumbindex = [];
            _breadcrumbval = [];
            _drphuvudomradenlista = [];
            _drphuvudomradenvalue = [];
            _RenderOutputdrpObj = [];
            _renderDOMList = "";
            _renderDrpList = "";            
                       
            initomradesdrp(_currentHuvudomradeID);// lägger till alla kopplade länkar

            FilterRender();
        };
        
            //lägger till options först i filterdropdownen
        var AddFilterdrpInit = function () {
            _drpFilter.empty();
            var newOption = $('<option>' + _filtreranamn + '</option>'); // lägg alltid till option överst i listan
            _drpFilter.append(newOption);
        }
        var AddOmradenToDrp = function (value, name) {            
            var newOption = $('<option value="' + value + '">' + name + '</option>');
            _drpFilter.append(newOption);

            _drpFilter.trigger("chosen:updated");
            return true;
        }
       
      
        /// BREADCRUMB START  (lägg över till helper js)

            // Lägger till breadrumb valt område från arrayerna med a-länkar och index OBS måste ha samma index!!!
        var Addtobreadcrumbval = function (valomr, valdid) {
            var addhref = "";
            if (valomr != "Visa alla") {
                addhref = "<li><a href=''class='removebreadcrumbval' rel='" + valdid + "'>" + valomr + "</a></li>";
            }
            
            // Lägger tillendast här ifrån annars blir det osynk
            _breadcrumbval.push(addhref);
            _breadcrumbindex.push(valdid);

            FilterRender();
          
            $("#breadcrumbval").append(addhref);
            return false;
        }

        // tabort valt breadrumb område från arrayerna med a-länkar och index OBS måste ha samma index!!!
        var Delbreadcrumval = function (valid) {
            var rerender="";
            var i = _breadcrumbindex.indexOf(valid);
            if (i != -1) {
                // tar bort endast här ifrån annars blir det osynk
                _breadcrumbindex.splice(i, 1);
                _breadcrumbval.splice(i, 1);
            }

            $.each(_breadcrumbval,function(item, val){
                rerender += val;
            });

            FilterRender();

            $("#breadcrumbval").html(rerender);
            return false;

        }

        //initera breadcrumblistan
        var initbreadcrumb = function () {


        }
        /// BREADCRUMB END
        

        //HELPER Funktions
        var showvisaalla = function () {
            var isantal = $('#breadcrumbval li').size();

            if (isantal == 0) {

            }

        }
        


        // EVENTS START
        $('#drpFilter').change(function (e) {
            //$('.loader').show();
            
            var currentdrp = $("#drpFilter option:selected");
            
            var valtid = currentdrp.val();
            var valtomr = currentdrp.text();
            if (valtid == "Avgränsa") {
                return false;
            }

            //add to breadcrumb
            if (valtid == _currentHuvudomradeID) {
                ResetFilter();
            } else {
                if (_breadcrumbval.length == 0) {
                    $("#breadcrumbval").empty();
                }

                Addtobreadcrumbval(valtomr, valtid);
            }            
            $('.kivisotope').isotope("layout");
            return false;
        });

       //
        $('#drpSortering').change(function (e) {
            //$('.loader').show();

            var currentdrp = $("#drpSortering option:selected");

            var valdid = currentdrp.val();
            //var valdtyp = currentdrp.text();
            if (valdid == "alla") {
                return false;
            }
           
            if (valdid == _omradesNamn) {
                _valdSortering = "";
                ResetFilter();
            } else {
                _valdSortering = valdid
                FilterRender();
            }
            $('.kivisotope').isotope("layout");
            return false;
        });
       

        $(document).on('click', '.resetbreadcrumb', function () {
            ResetFilter();
        })
        

        $(document).on('click', '.removebreadcrumbval', function () {
            //Del from breadcrumb
            $('.loader').show();
            var relval = $(this).attr('rel'); // hämta områsdesid
            Delbreadcrumval(relval);            
            return false;
        });
        // EVENTS END


        var removePlussicon = function (e) {
            var istextset = $('.ingresstext');
            istextset.each(function (index, value) {
                var testar = $(value).html();
                if ($(value).html()) {
                    $(value).siblings().find('.showingresstext').show();
                }

            });

        }


        // SETTINGS
        var init = function () {
            if (_currentHuvudomradeID) {
                initomradesdrp(_currentHuvudomradeID);// lägger till alla kopplade länkar
            };

        };
        
        // INITIERING
        init();
       
        

});//Jqueryready end


})();//kapsla END
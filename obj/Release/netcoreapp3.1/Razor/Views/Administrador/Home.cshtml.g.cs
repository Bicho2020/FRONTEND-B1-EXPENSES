#pragma checksum "D:\B1E\Frontend\Views\Administrador\Home.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "2d00aedbfd71245df96c474bbd21be5dcc7ad621"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Administrador_Home), @"mvc.1.0.view", @"/Views/Administrador/Home.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\B1E\Frontend\Views\_ViewImports.cshtml"
using FondoPorRendir2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\B1E\Frontend\Views\_ViewImports.cshtml"
using FondoPorRendir2.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2d00aedbfd71245df96c474bbd21be5dcc7ad621", @"/Views/Administrador/Home.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5cac0c41de36487d78c6b92319ff545d22ab428a", @"/Views/_ViewImports.cshtml")]
    public class Views_Administrador_Home : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "D:\B1E\Frontend\Views\Administrador\Home.cshtml"
  
    Layout = "_LayoutAdministrador";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container-fluid  pb-3 mt-3"" style=""display:none;"" >

    <div class=""row"">

            <div class=""col-12 col-lg-6"">

                <div class=""p-1"">

                  <div class=""bg-white shadow "" style=""min-height: 827.5px; max-height:827.5px;"">

                        <div class=""p-3   text-center"">

                            <h5 class=""mt-2 font-weight-bold"">MIS SOLICITUDES FONDOS</h5>

                            <div class=""row"">

      
                                <figure class=""highcharts-figure"">
                                    <div  id=""container""></div>
                                    
                                </figure>

                            </div>

                            <div class=""row"">

                                <div class=""col-6 p-2"">

                                    <h1 id=""FTOTAL"" style=""color: #0abbec;"">0</h1>
                                    <span style=""font-size: 13px;"" class=""font-weight-bold"">");
            WriteLiteral(@"Total</span>

                                </div>

                                <div class=""col-6 p-2"">

                                    <h1 id=""FEN"" style=""color: #0abbec;"">0</h1>
                                    <span style=""font-size: 13px;"" class=""font-weight-bold"">En proceso de aprobación </span>
                                </div>

                            </div>

                            <div class=""row"">

                                <div >

                                    <h5 class=""pt-4 p-3  font-weight-bold"">Proceso aprobación fondos</h5>
            
                                    <table class=""table table-bordered shadow-sm table-striped"" id=""TablaFondo"">
                                        <thead class=""thead-dark "">
                                            <tr>
            
                                                <th scope=""col"">Etapa</th>
                                                <th scope=""col"">Aprobador</th>
     ");
            WriteLiteral(@"                                       
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
            
            
                                </div>
                                

                            </div>

                        </div>

                    </div>

                </div>

            </div>

           <div class=""col-12 col-lg-6"">

                <div class=""p-1"">

                    <div class=""bg-white shadow "" style=""min-height: 827.5px; max-height:827.5px;"">

                        <div class=""p-3   text-center"">

                            

                            <h5 class=""mt-2 font-weight-bold"">MIS SOLICITUDES RENDICIÓN</h5>

                            <div class=""row mt-3"">

            ");
            WriteLiteral(@"                  
                                <figure class=""highcharts-figure"">
                                    <div id=""container2""></div>
                                    
                                </figure>

                            </div>

                            <div class=""row"">

                                <div class=""col-6 p-2"">

                                    <h1 id=""RTOTAL""  style=""color: #0abbec;"">0</h1>
                                    <span style=""font-size: 13px;"" class=""font-weight-bold"">Total</span>

                                </div>

                                <div class=""col-6 p-2"">

                                    <h1  id=""REN""  style=""color: #0abbec;"">0</h1>
                                    <span style=""font-size: 13px;"" class=""font-weight-bold"">En proceso de aprobación </span>

                                </div>

                            </div>

                            <div class=""row"">

        ");
            WriteLiteral(@"                        <div >

                                    <h5 class=""pt-4 p-3  font-weight-bold"">Proceso aprobación fondos</h5>
            
                                    <table class=""table table-bordered shadow-sm table-striped"" id=""TablaRendicion""  >
                                        <thead class=""thead-dark "">
                                            <tr>
            
                                                <th scope=""col"">Etapa</th>
                                                <th scope=""col"">Aprobador</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                          
                                        </tbody>
                                    </table>
            
            
                                </div>
          ");
            WriteLiteral("                      \r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n        </div>\r\n\r\n</div>\r\n\r\n\r\n");
            DefineSection("scripts", async() => {
                WriteLiteral(@"

    <script src=""https://code.highcharts.com/highcharts.js""></script>
    <script src=""https://code.highcharts.com/modules/variable-pie.js""></script>
    <script src=""https://code.highcharts.com/modules/exporting.js""></script>
    <script src=""https://code.highcharts.com/modules/export-data.js""></script>
    <script src=""https://code.highcharts.com/modules/accessibility.js""></script>



    <script>

        $(""#menu-toggle"").click(function (e) {
            e.preventDefault();
            $(""#wrapper"").toggleClass(""toggled"");
        });

    </script>


");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591

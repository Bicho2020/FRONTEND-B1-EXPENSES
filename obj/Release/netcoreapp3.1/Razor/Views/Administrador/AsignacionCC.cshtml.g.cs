#pragma checksum "D:\B1E\Frontend\Views\Administrador\AsignacionCC.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8efcd235fc6b914be8c08ffd098be1a6d087f171"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Administrador_AsignacionCC), @"mvc.1.0.view", @"/Views/Administrador/AsignacionCC.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8efcd235fc6b914be8c08ffd098be1a6d087f171", @"/Views/Administrador/AsignacionCC.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5cac0c41de36487d78c6b92319ff545d22ab428a", @"/Views/_ViewImports.cshtml")]
    public class Views_Administrador_AsignacionCC : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/API/Administrador/AsignacionCC.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\B1E\Frontend\Views\Administrador\AsignacionCC.cshtml"
  
    Layout = "_LayoutAdministrador";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""row"">

    <div class=""col-lg-7 col-sm-12 col-md-12 col-12   pt-3 "">

        <div class=""col-12 shadow bg-white  pb-2 border  "">

            <div style=""background-color: #0abbec;"" class=""  p-2 "">

                <div class=""float-left ml-3"">
                    <span style=""font-size: 18px;"" class=""text-white font-weight-bold "">Asignacion de centro de costos </span>
                </div>
                <br>
            </div>

            <div class=""p-2"">
                <input type=""type"" class=""form-control form-control-sm rounded-0 mt-2 w-50 "" placeholder=""Filtrar usuario"" id=""Filtro"" />
            </div>

            <div class=""table-responsive p-2 "">

                <table class=""table table-striped table-bordered  table-hover"" id=""TablaListarUsuarios"">

                    <thead class=""thead-dark "">
                        <tr>

                            <th scope=""col"" class=""text-center"" style=""font-size: 14px; font-weight: 500;"">Rut</th>
          ");
            WriteLiteral(@"                  <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Nombre</th>
                            <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Apellido</th>
                            <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>
        </div>
    </div>

</div>




");
            DefineSection("scripts", async() => {
                WriteLiteral("\r\n\r\n\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8efcd235fc6b914be8c08ffd098be1a6d087f1715401", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <script>\r\n        $(\"#menu-toggle\").click(function (e) {\r\n            e.preventDefault();\r\n            $(\"#wrapper\").toggleClass(\"toggled\");\r\n        });\r\n    </script>\r\n\r\n\r\n");
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

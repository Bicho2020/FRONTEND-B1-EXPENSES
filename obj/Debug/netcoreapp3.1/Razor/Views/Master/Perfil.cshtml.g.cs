#pragma checksum "C:\Users\Vicente\Desktop\F\Views\Master\Perfil.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "abfb2983af24f45f1563c52622d0ce97bda6234b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Master_Perfil), @"mvc.1.0.view", @"/Views/Master/Perfil.cshtml")]
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
#line 1 "C:\Users\Vicente\Desktop\F\Views\_ViewImports.cshtml"
using FondoPorRendir2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Vicente\Desktop\F\Views\_ViewImports.cshtml"
using FondoPorRendir2.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"abfb2983af24f45f1563c52622d0ce97bda6234b", @"/Views/Master/Perfil.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5cac0c41de36487d78c6b92319ff545d22ab428a", @"/Views/_ViewImports.cshtml")]
    public class Views_Master_Perfil : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/img/codigo-pin.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("height", new global::Microsoft.AspNetCore.Html.HtmlString("20px"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("onsubmit", new global::Microsoft.AspNetCore.Html.HtmlString("ModificarContra(event);"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/API/usuarioAPI.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\Vicente\Desktop\F\Views\Master\Perfil.cshtml"
  
    Layout = "_LayoutMaster";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div class=""row mt-1"">

    <div class=""col-lg-9 col-12 mt-3"">

        <div class=""pl-3 pt-2 pb-1 shadow"" style=""background-color:#0abbec;"">

            <h5 class=""text-white font-weight-bold "">Mis datos</h5>

        </div>

        <div class=""shadow bg-white"">

            <div class=""p-2"">

                <div class=""row"">

                    <div class=""col-12"">

                        <button data-toggle=""modal"" data-target=""#exampleModal"" class=""float-right mr-2 pt-2 btn btn-light border shadow-sm btn-sm p-2"" >");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "abfb2983af24f45f1563c52622d0ce97bda6234b5513", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@" Cambiar contraseña</button>
                        
                    </div>

                </div>

                <div class=""table-responsive p-1 mt-3 w-100"">

                    <table class=""table table-striped table-bordered table-hover w-100 "" id=""TablaRendiciones"">

                        <tbody>

                            <tr>

                                <td scope=""col"" class=""text-left"" style=""font-size: 13px; font-weight: 500;"">
                                    <div class=""row text-left"">

                                        <div class=""col-2"">
                                            <span class=""font-weight-bold"">Rut:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""rut""></span>
                                        </div>

                                        <div class=""col-2"">
                                            ");
            WriteLiteral(@"<span class=""font-weight-bold"">Correo:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""correo""></span>
                                        </div>
                                    </div>
                                </td>

                            </tr>

                            <tr>
                                <td scope=""col"" class=""text-left"" style=""font-size: 13px; font-weight: 500;"">

                                    <div class=""row text-left"">

                                        <div class=""col-2"">
                                            <span class=""font-weight-bold"">Nombre:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""nombre""></span>
                                        </div>

                           ");
            WriteLiteral(@"             <div class=""col-2"">
                                            <span class=""font-weight-bold"">Apellido:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""apellido""></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>


                            <tr>

                                <td scope=""col"" class=""text-left"" style=""font-size: 13px; font-weight: 500;"">

                                    <div class=""row text-left"">

                                        <div class=""col-2"">
                                            <span class=""font-weight-bold"">Dirección:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""direcci");
            WriteLiteral(@"on""></span>
                                        </div>

                                        <div class=""col-2"">
                                            <span class=""font-weight-bold"">Telefono:</span>
                                        </div>

                                        <div class=""col-4"">
                                            <span id=""telefono""></span>
                                        </div>
                                    </div>

                                </td>

                            </tr>



                        </tbody>

                    </table>

                </div>

            </div>

        </div>


    </div>



</div>



<div class=""modal fade"" id=""exampleModal"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModalLabel"" aria-hidden=""true"">
    <div class=""modal-dialog"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""");
            WriteLiteral(@"modal-title"" id=""exampleModalLabel"">Cambio de contraseña</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close"">
                    <span aria-hidden=""true"">&times;</span>
                </button>
            </div>
            <div class=""modal-body p-3"">

                <h6 class=""mt-1"">Ingrese su nueva contraseña.</h6>

                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "abfb2983af24f45f1563c52622d0ce97bda6234b11358", async() => {
                WriteLiteral(@"

                    <div class=""row"">

                        <div class=""col-12"">
                            <input class=""form-control w-100 rounded-0 mt-3 "" minlength=""8"" id=""txt_pass"" placeholder=""Ingrese contraseña"" type=""password"" required>
                        </div>

                        <div class=""col-12"">
                            <input class=""form-control w-100 rounded-0 mt-3 "" minlength=""8"" id=""txt_pass_2"" placeholder=""Confirme contraseña"" type=""password"" required>
                        </div>

                    </div>

                    <div class=""mt-3"">

                        <button type=""submit"" onclick=""ModificarContra();"" style=""background:#00b1e4; border-color:#0abbec ;"" class=""btn btn-primary shadow font-weight-bold mt-3 float-right"">
                            Modificar contraseña
                        </button>

                    </div>

                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n\r\n               \r\n\r\n            \r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
            DefineSection("scripts", async() => {
                WriteLiteral("\r\n\r\n\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "abfb2983af24f45f1563c52622d0ce97bda6234b13869", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
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

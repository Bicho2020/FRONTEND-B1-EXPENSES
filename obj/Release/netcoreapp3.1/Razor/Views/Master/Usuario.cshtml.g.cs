#pragma checksum "D:\B1E\Frontend\Views\Master\Usuario.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "cefc140d5af7c82b1a8e0c60a87503c69fc072e2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Master_Usuario), @"mvc.1.0.view", @"/Views/Master/Usuario.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"cefc140d5af7c82b1a8e0c60a87503c69fc072e2", @"/Views/Master/Usuario.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5cac0c41de36487d78c6b92319ff545d22ab428a", @"/Views/_ViewImports.cshtml")]
    public class Views_Master_Usuario : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("container-fluid mt-3"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("onsubmit", new global::Microsoft.AspNetCore.Html.HtmlString("GuardarUsuario(event)"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/API/Master/UsuarioApi.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\B1E\Frontend\Views\Master\Usuario.cshtml"
  
    Layout = "_LayoutMaster";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""row"">

    <div class=""col-lg-6 col-sm-12 col-md-12 col-12   pt-3 "">

        <div class=""col-12 shadow bg-white  pb-2 border  "">

            <div style=""background-color: #0abbec;"" class=""  p-2 "">

                <div class=""float-left ml-3"">
                    <span style=""font-size: 18px;"" class=""text-white font-weight-bold "">Registrar usuario</span>
                </div>
                <br>

            </div>

            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cefc140d5af7c82b1a8e0c60a87503c69fc072e25013", async() => {
                WriteLiteral(@"

                <span class=""text-dark"">
                    Formulario para registro de usuarios. <span class=""text-danger  pl-3 "" style=""font-weight: 500; font-size:14px;"">
                        * Campos
                        Obligatorios
                    </span>
                </span>


                <div class=""row mt-2 "">

                    <div class=""col-12 col-sm-12 col-md-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 1085, "\"", 1091, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Rut <span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input type=""text"" class=""form-control rounded-0 mt-2 form-control-sm""  min=""6""  id=""IsRut""
                                   placeholder=""Ingrese rut del usuario"" required>
                        </div>
                    </div>

                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 1729, "\"", 1735, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Nombre <span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese nombre del usuario"" type=""text""
                                   class=""  form-control rounded-0 mt-2 form-control-sm""  min=""2""  id=""IsNombre"" required>
                        </div>
                    </div>

                </div>

                <div class=""row "">

                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 2448, "\"", 2454, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Apellido<span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese apellido del usuario"" type=""text""
                                   class=""form-control rounded-0 mt-2 form-control-sm"" id=""IsApellido"" min=""2""  required>
                        </div>
                    </div>

                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 3105, "\"", 3111, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Correo<span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese correo del usuario "" type=""email"" class="" form-control rounded-0 mt-2 form-control-sm"" id=""IsCorreo"" required>
                        </div>
                    </div>

                </div>

                <div class=""row "">

                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 3778, "\"", 3784, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Direccion<span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese direccion del usuario"" type=""text""
                                   class=""form-control rounded-0 mt-2 form-control-sm"" min=""4""  id=""IsDirección"" required>
                        </div>
                    </div>

                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 4438, "\"", 4444, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Teléfono<span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese telefono del usuario"" type=""number""
                                   class="" form-control rounded-0 mt-2 form-control-sm"" min=""7""  id=""IsTelefono"" required>
                        </div>
                    </div>

                </div>

                <div class=""row "">
                    <div class=""col-12 col-lg-6 pt-2"">
                        <div class=""form-group"">
                            <label");
                BeginWriteAttribute("for", " for=\"", 5160, "\"", 5166, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""text-dark "" style=""font-weight: 400;"">
                                Contraseña<span class=""text-danger"">
                                    *
                                </span>
                            </label>
                            <input placeholder=""Ingrese contraseña para el usuario"" type=""password""
                                   class="" form-control rounded-0 mt-2 form-control-sm"" min=""8"" max=""100"" id=""IsPass"" required>
                        </div>
                    </div>
                </div>



                <div class=""row "">

                    <div class=""mt-1 pb-2"">
                        <button type=""submit"" style=""background-color: #0abbec; border-color: #5abeda;""
                                class=""btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right"">
                            Registrar
                            Usuario
                        </button>
                    </div>

                </div>");
                WriteLiteral("\n\r\n            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-lg-6 col-sm-12 mt-3 col-md-12 col-12 col-md-12 \">\r\n\r\n        <div");
            BeginWriteAttribute("class", " class=\"", 6334, "\"", 6342, 0);
            EndWriteAttribute();
            WriteLiteral(@">

            <div class=""col-12 shadow bg-white"">

                <div style=""background-color: #0abbec;"" class=""   p-2 "">

                    <div class=""float-left ml-3"">
                        <span style=""font-size: 18px;"" class=""text-white font-weight-bold  "">Lista de  usuarios activos</span>
                    </div>

                    <div class=""float-right"">
                      
                    </div>

                    <br>

                </div>


                <div class=""p-2"">
                    <input type=""type"" class=""form-control form-control-sm rounded-0 mt-2 w-50 "" placeholder=""Filtrar usuarios"" id=""FiltroUsuario"" />
                </div>


                <div class=""table-responsive p-2 "">

                    <table class=""table table-striped table-bordered  table-hover "" id=""TablaListarUsuariosActivos"">

                        <thead class=""thead-dark "">
                            <tr>
                                <th scope=""col"" c");
            WriteLiteral(@"lass=""text-center"" style=""font-size: 13px; font-weight: 500;"">Rut</th>
                                <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Nombre</th>
                                <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Apellido</th>
                                <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Modificar</th>
                                <th scope=""col"" class=""text-center"" style=""font-size: 13px; font-weight: 500;"">Opcion</th>
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




");
            DefineSection("scripts", async() => {
                WriteLiteral("\r\n\r\n\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cefc140d5af7c82b1a8e0c60a87503c69fc072e215598", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n\r\n    <script>\r\n        $(\"#menu-toggle\").click(function (e) {\r\n            e.preventDefault();\r\n            $(\"#wrapper\").toggleClass(\"toggled\");\r\n        });\r\n    </script>\r\n\r\n\r\n");
            }
            );
            WriteLiteral("\r\n");
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

using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "d349e6d90c39494da388cb98b18e1dfc";

        //metodo para reconhecer o caracteres(texto) a partir de uma imagem
        private readonly string _endpoint = "https://cvvitalhubg5dm.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //cria um client para a API
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials
                    (_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {

                return "Erro ao reconhecer o texto" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //percorre todas as regioes
            foreach (var region in result.Regions)
            {
                //para cada regiao percorre as linhas
                foreach (var line in region.Lines)
                {
                    //para cada linha percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //adiciona cada palavra ao texto, separando com espaco
                        recognizedText += word.Text + " ";
                    }

                    //quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }

            //retorna o texto
            return recognizedText;
        }
    }
}

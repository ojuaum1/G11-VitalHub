using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
<<<<<<< HEAD
        private readonly string _subscriptionKey = "";
        private readonly string _endpoint = "https://computer-vision-vital-hub-matheus.cognitiveservices.azure.com/";
=======
        private readonly string _subscriptionKey = "d349e6d90c39494da388cb98b18e1dfc";

        //metodo para reconhecer o caracteres(texto) a partir de uma imagem
        private readonly string _endpoint = "https://cvvitalhubg5dm.cognitiveservices.azure.com/";
>>>>>>> develop

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
<<<<<<< HEAD
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
=======
                //cria um client para a API
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials
                    (_subscriptionKey))
>>>>>>> develop
                {
                    Endpoint = _endpoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }
<<<<<<< HEAD
            catch (Exception)
            {
                return "Erro ao reconhecer o texto";
=======
            catch (Exception ex)
            {

                return "Erro ao reconhecer o texto" + ex.Message;
>>>>>>> develop
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

<<<<<<< HEAD
            foreach (var region in result.Regions)
            {
                foreach (var line in region.Lines)
                {
                    foreach (var word in line.Words)
                    {
                        recognizedText += word.Text + " ";
                    }

=======
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
>>>>>>> develop
                    recognizedText += "\n";
                }
            }

<<<<<<< HEAD
=======
            //retorna o texto
>>>>>>> develop
            return recognizedText;
        }
    }
}

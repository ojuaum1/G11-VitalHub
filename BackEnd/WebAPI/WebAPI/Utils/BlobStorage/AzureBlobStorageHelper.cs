using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageAsync(IFormFile file, string connectionString, string containerName)
        {
			try
			{
                if (file == null)
                {
                    return "https://blobvitalhubg11matheus12.blob.core.windows.net/vitalhubcontainermatheus/undraw_People_re_8spw.png";
                }

                var newblobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                var blobServiceClient = new BlobServiceClient(connectionString);
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = blobContainerClient.GetBlobClient(newblobName);

                using (var stream = file.OpenReadStream())
                {
                    await blobClient.UploadAsync(stream, true);
                }

                return blobClient.Uri.ToString();
            }
			catch (Exception)
			{
				throw;
			}
        }
    }
}

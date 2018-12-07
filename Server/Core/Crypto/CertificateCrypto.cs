using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace Core.Crypto
{
	public static class CertificateCrypto
	{
		// Example 1: Signing a byte[] using PKCS#1 v1.5 padding and a SHA-256 hash

		// 4.6:
		public static byte[] SignDataPkcs1Sha256( X509Certificate2 cert, byte[] data )
		{
			// GetRSAPrivateKey returns an object with an independent lifetime, so it should be
			// handled via a using statement.
			using ( RSA rsa = cert.GetRSAPrivateKey() )
			{
				// RSA now exposes SignData, and the hash algorithm parameter takes a strong type,
				// which allows for IntelliSense hints.
				return rsa.SignData( data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1 );
			}
		}

		// Example 2: Signing a byte[] using PSS padding and a SHA-256 hash.

		// 4.5: Not possible

		// 4.6:
		public static byte[] SignDataPssSha256( X509Certificate2 cert, byte[] data )
		{
			using ( RSA rsa = cert.GetRSAPrivateKey() )
			{
				// RSA's SignData method exposes the signature padding type.
				// Pkcs1 was the only padding that .NET 4.5 could do.
				//
				// This value must match on both Sign and Verify, so application developers
				// are cautioned to consider their support matrix before upgrading from
				// Pkcs1 (PKCS#1 v1.5) to Pss (PKCS#1 v2.1, Probabilistic Signature Scheme)
				return rsa.SignData( data, HashAlgorithmName.SHA256, RSASignaturePadding.Pss );
			}
		}

		// Example 3: Encrypting a byte[] using OAEP(-SHA1)

		// 4.6:
		public static byte[] EncryptDataOaepSha1( X509Certificate2 cert, byte[] data )
		{
			// GetRSAPublicKey returns an object with an independent lifetime, so it should be
			// handled via a using statement.
			using ( RSA rsa = cert.GetRSAPublicKey() )
			{
				// OAEP allows for multiple hashing algorithms, what was formerly just "OAEP" is
				// now OAEP-SHA1.
				return rsa.Encrypt( data, RSAEncryptionPadding.OaepSHA1 );
			}
		}

		// Example 4: Encrypting a byte[] using OAEP-SHA256

		// 4.5: Not possible

		// 4.6:
		public static byte[] EncryptDataOaepSha256( X509Certificate2 cert, byte[] data )
		{
			using ( RSA rsa = cert.GetRSAPublicKey() )
			{
				return rsa.Encrypt( data, RSAEncryptionPadding.OaepSHA256 );
			}
		}

		// 4.6:
		public static byte[] DencryptDataOaepSha1( X509Certificate2 cert, byte[] data )
		{
			// GetRSAPublicKey returns an object with an independent lifetime, so it should be
			// handled via a using statement.
			using ( RSA rsa = cert.GetRSAPublicKey() )
			{
				// OAEP allows for multiple hashing algorithms, what was formerly just "OAEP" is
				// now OAEP-SHA1.
				return rsa.Decrypt( data, RSAEncryptionPadding.OaepSHA1 );
			}
		}

		// Example 4: Encrypting a byte[] using OAEP-SHA256

		// 4.5: Not possible

		// 4.6:
		public static byte[] DencryptDataOaepSha256( X509Certificate2 cert, byte[] data )
		{
			using ( RSA rsa = cert.GetRSAPublicKey() )
			{
				return rsa.Decrypt( data, RSAEncryptionPadding.OaepSHA256 );
			}
		}
	}
}
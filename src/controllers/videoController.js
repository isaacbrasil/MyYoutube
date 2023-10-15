const { Pool } = require("pg");

// Configuração do pool de conexão
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "youtubedb",
  password: "admin",
  port: 5432,
});

const saveVideoToDatabase = async (file) => {
  try {
    // Conecte-se ao banco de dados
    const client = await pool.connect();

    // Insira o vídeo no banco de dados
    const queryText =
      "INSERT INTO videos(data, filename) VALUES($1, $2) RETURNING id";
    const values = [file.buffer, file.originalname];
    const result = await client.query(queryText, values);

    client.release();

    console.log("Vídeo salvo com o ID:", result.rows[0].id);
  } catch (err) {
    console.error("Erro ao salvar o vídeo no banco de dados:", err.stack);
  }
};

export const handleVideoUpload = async (req, res) => {
  try {
    // Assumindo que 'file' é o nome do campo no formulário de upload
    const file = req.file;
    await saveVideoToDatabase(file);

    res.send("Vídeo salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao processar o upload:", error);
    res.status(500).send("Erro ao processar o upload");
  }
};

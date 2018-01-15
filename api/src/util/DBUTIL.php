<?

class DBUTIL {

    static private $HOST = "localhost:5432";
    static private $DB_NAME = "postgres";
    static private $USER = "postgres";
    static private $PASSWORD = "121212";
    static private $DB = "pgsql";
    
    static function init() {

    }

    static private function getPDO() {
        try
        {
            $pdo = new PDO( $DB . ':host=' . $HOST . ';dbname=' . $DB_NAME, $USER, $PASSWORD );
            return $pdo;
        }
        catch ( PDOException $e )
        {
            echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
            return null;
        }
    }

    static function get($table, $itens, $where) {
        if ($pdo =  DBUTIL::getPDO()) {
            
            $tableStr = $table;
            $itensStr = "";
            $whereStr = "";

            echo "T1";

            foreach ($where as $key => $item) {
                $whereStr += "AND " + $key + " :" + removeSimbols($key);
            }

            foreach ($itens as $item) {
                $itensStr += ", " + $item;
            }

            $sql = "SELECT 1 " . $itensStr . " FROM " . $table . " WHERE 1 = 1 " + $whereStr;

            $sth = $pdo->prepare($sql);

            foreach ($where as $key => $item) {
                $sth->bindParam(":" + removeSimbols($key), $item);
            }
            echo "T2";
            
            $sth->execute();
            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            return $result;
        }
    }

    static function removeSimbols($str) {
        $str = str_replace("=", "", $str);
        $str = str_replace(">", "", $str);
        $str = str_replace("<", "", $str);

        return $str;
    }
}

?>
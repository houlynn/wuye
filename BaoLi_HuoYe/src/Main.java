import java.util.Random;


public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		  Random rd = new Random();
		  String n="";
		  int getNum;
		  do {
		   getNum = Math.abs(rd.nextInt())%10 + 48;//产生数字0-9的随机数
		   char num1 = (char)getNum;
		   String dn = Character.toString(num1);
		   n += dn;
		  } while (n.length()<6);
		 
		  System.out.println(n);
	}

	public static void getRandomPwd(){
		  Random rd = new Random();
		  String n="";
		  int getNum;
		  do {
		   getNum = Math.abs(rd.nextInt())%10 + 48;//产生数字0-9的随机数
		   //getNum = Math.abs(rd.nextInt())%26 + 97;//产生字母a-z的随机数
		   char num1 = (char)getNum;
		   String dn = Character.toString(num1);
		   n += dn;
		  } while (n.length()<6);
		  System.out.println("随机的6位密码是：" + n);
		 }
	public String getRandStr(int charCount) {
		String charValue = "";
	    for (int i = 0; i < charCount; i++){
		    char c = (char) (randomInt(0,26)+'a');
		    charValue += String.valueOf(c);
	    }
		return charValue;
	}
	public String getRandNum(int charCount) {
		String charValue = "";
	    for (int i = 0; i < charCount; i++){
		    char c = (char) (randomInt(0,10)+'0');
		    charValue += String.valueOf(c);
	    }
		return charValue;
	}
	 public int randomInt(int from, int to){
		  Random r = new Random();
		  return from + r.nextInt(to - from);
	}
	
}

redes com kubernetes
CNI plugin implementam a sdn
o kubenet é o default para o kops
se seu cluster é maior que 50 pods por exemplo, kubenet nao é legal na aws pq ele cria uma rota por pod, e tem limit de 50 rotas na tabela da aws

redes overlay sao mais embaixo, tipo o Flannel, é uma abstração SOBRE a VPC da aws, baseado em vxlan, tem uma latencia extra, pq o protocolo vxlan "abraça" os pacotes com seu proprio protocolo. muito escalavel, mas nao é a mais performatica.

a aws tem o proprio cni plugin, VPC CNI. ele cria ENIs com ops secundarios associados a seus pods. tem limite de ENIs baseado na instancia, por exemplo, um t2.micro so pode ter 2 enis... (foto) normalmente vc nao vai colocar esta quantidade de pods em uma t2micro.

vantagem do VPC CNI plugin é que voce pode se beneficiar de todos os goodies da VPC service da aws, pq vc ta praticamente nativo.

é possivel com eks fazer network policies (segmentacao) via labels para o policy selector. dai vc tem fine grain control nos ingress policies.

para monitorar recomendou o stack EFK

containers tem vida de minutos agora, nao mais de horas ou dias.

COntinuous deployment on kube

a chavinha no lambda é chave de autenticacao para a lamda deployar no seu cluster (parameter store)

roll-out histories permite versionamento e rollbacks para deploys historiados

liveness e readiness para entender se seu deploy esta rodando da maneira intencionada

Renan Capaverde
@apseyyyy
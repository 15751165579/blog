# 再谈分布式

  我们前面谈到分布式只要采用简单的一行命令就可以解决了：

```s
  set lock:demo true ex 5 nx
  # 复杂的操作
  del lock:demo
```

  但是在集群的环境下并不是非常的安全，例如在sentinel集群下，一个客户端在主Redis中申请了一把锁，突然主Redis挂掉，从节点转化为主Redis，那么另一个客户端去申请同样的锁的时候，由于从节点中没有原来锁的记录，所以一样可以申请成功，不过这种情况在大部分的业务系统中是能够容忍的。

### Redlock算法

  为了解决这个问题，Redis作者发明了Redlock算法，为了使用Redlock，我们需要创建多个独立的Redis实例。

  何时使用Redlock?

  如果你特别在乎高可用性，那么就可以上Redlock，不过带来的代价是非常大的。

  - 需要多个独立的Redis实例，性能下降
  - 需要引入额外的库，运维上也需要特殊的对待